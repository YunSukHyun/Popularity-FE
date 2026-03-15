import styles from "./uploader.module.css";
import { firebaseConfig } from "../../service/firebase";
import Icon from "../icon/icon";
import Character from "../character/character";
import GoogleOAuth from "../../common/googleOAuth";
import api from "../../service/axios";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

type VoteMethod = "SELECT1" | "SELECT3" | "SELECT6";

interface CandidateItem {
  name: string;
  thumbnail: string;
}

interface FormDataType {
  title: string;
  icon: string;
  background: string;
  candidates: CandidateItem[];
  startTime: string;
  endTime: string;
  voteMethod: VoteMethod;
}

interface UploaderProps {
  formData: FormDataType;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
}

const voteMethod: { value: VoteMethod; label: string }[] = [
  { value: "SELECT1", label: "1등만" },
  { value: "SELECT3", label: "1등: 2점, 2등(2명): 1점" },
  { value: "SELECT6", label: "1등: 3점, 2등(2명): 2점, 3등(3명): 1점" },
];

const Uploader = ({ formData, setFormData }: UploaderProps) => {
  const [uploading, setUploading] = useState<boolean>(false);

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const uploadImage = (file: File, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("File available at", url);
            resolve(url);
          });
        },
      );
    });
  };

  const uploadImages = (images: File[]): Promise<CandidateItem[]> => {
    const uploadPromises = images.map((fileItem) => {
      const storageRef = ref(storage, "candidate/" + fileItem.name);
      const uploadTask = uploadBytesResumable(storageRef, fileItem);

      return new Promise<CandidateItem>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log("File available at", url);
              resolve({ name: fileItem.name.split(".")[0], thumbnail: url });
            });
          },
        );
      });
    });

    return Promise.all(uploadPromises);
  };

  const changeImage = async (
    e: ChangeEvent<HTMLInputElement>,
    folder: "icon" | "background",
  ): Promise<void> => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];

    try {
      const url = await uploadImage(file, folder);

      if (folder === "icon") {
        setFormData((prev) => ({ ...prev, icon: url }));
      } else {
        setFormData((prev) => ({ ...prev, background: url }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setUploading(false);
  };

  const changeCandidates = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);

    try {
      const result = await uploadImages(Array.from(e.target.files));
      setFormData((prev) => ({
        ...prev,
        candidates: result,
      }));
    } catch (error) {
      console.error("Error uploading candidates:", error);
    }

    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const requestData: FormDataType = {
      ...formData,
      endTime: new Date(formData.endTime).toISOString(),
    };

    try {
      const response = await api.post("/vote/new", requestData);

      if (response.status !== 200) {
        throw new Error("Bad response");
      } else {
        alert("Vote created");
      }
    } catch (error) {
      console.error("Failed to register vote:", error);
      alert("Failed to register vote. Please try again.");
    }

    console.log(requestData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <section className={styles.h1}>투표 등록</section>

      <form onSubmit={handleSubmit} className={styles.productForm}>
        <div className={styles.inlined}>
          <label className={styles.label} htmlFor="title">
            투표명
          </label>
          <input
            onChange={handleChange}
            type="text"
            className={styles.input}
            id="title"
            name="title"
            value={formData.title}
            required
          />
        </div>

        <div className={styles.inlined}>
          <label className={styles.label} htmlFor="endTime">
            종료 시간
          </label>
          <input
            type="datetime-local"
            className={styles.input}
            id="endTime"
            name="endTime"
            onChange={handleChange}
            value={formData.endTime}
            min={new Date().toISOString().slice(0, 16)}
            required
          />
        </div>

        <div className={styles.inlined}>
          <label htmlFor="voteMethod" className={styles.label}>
            투표방식
          </label>
          <select
            name="voteMethod"
            id="voteMethod"
            onChange={handleChange}
            value={formData.voteMethod}
            className={styles.select}
          >
            {voteMethod.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inlined}>
          <label className={styles.label} htmlFor="icon">
            아이콘
          </label>

          <input
            type="file"
            className={styles.input}
            id="icon"
            accept="image/*"
            onChange={(e) => changeImage(e, "icon")}
          />
        </div>

        <div className={styles.inlined}>
          <label className={styles.label} htmlFor="background">
            배경 사진
          </label>

          <input
            type="file"
            className={styles.input}
            id="background"
            accept="image/*"
            onChange={(e) => changeImage(e, "background")}
          />
        </div>

        <div className={styles.inlined}>
          <label className={styles.label} htmlFor="candidates">
            후보
          </label>

          <input
            type="file"
            className={styles.input}
            id="candidates"
            multiple
            accept="image/*"
            onChange={changeCandidates}
          />
        </div>

        <section className={styles.images}>
          {formData.candidates.length === 0 ? (
            <Icon size="160px">image_search</Icon>
          ) : (
            formData.candidates.map(({ name, thumbnail }) => (
              <Character
                key={name}
                id={name}
                thumbnail={thumbnail}
                name={name}
              />
            ))
          )}
        </section>

        {localStorage.getItem("token") ? (
          <button className={styles.button} type="submit" disabled={uploading}>
            투표 등록
          </button>
        ) : (
          <GoogleOAuth />
        )}
      </form>
    </div>
  );
};

export default Uploader;
