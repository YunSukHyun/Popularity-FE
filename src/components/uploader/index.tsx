import styles from "./uploader.module.css";
import Icon from "../icon";
import Character from "../character";
import GoogleOAuth from "../../common/googleOAuth";
import api from "../../service/axios";
import { useMemo, useState } from "react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

type VoteMethod = "SELECT1" | "SELECT3" | "SELECT6";

interface CandidatePreviewItem {
  name: string;
  thumbnail: string;
}

interface FormDataType {
  title: string;
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
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const [candidateFiles, setCandidateFiles] = useState<File[]>([]);

  const candidatePreviews: CandidatePreviewItem[] = useMemo(() => {
    return candidateFiles.map((file) => ({
      name: file.name.includes(".")
        ? file.name.substring(0, file.name.lastIndexOf("."))
        : file.name,
      thumbnail: URL.createObjectURL(file),
    }));
  }, [candidateFiles]);

  const changeImage = (
    e: ChangeEvent<HTMLInputElement>,
    folder: "icon" | "background",
  ): void => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (folder === "icon") {
      setIconFile(file);
    } else {
      setBackgroundFile(file);
    }
  };

  const changeCandidates = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) return;
    setCandidateFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!iconFile) {
      alert("아이콘 이미지를 선택해주세요.");
      return;
    }

    if (!backgroundFile) {
      alert("배경 이미지를 선택해주세요.");
      return;
    }

    if (candidateFiles.length === 0) {
      alert("후보 이미지를 하나 이상 선택해주세요.");
      return;
    }

    setUploading(true);

    try {
      const requestData = new FormData();
      requestData.append("title", formData.title);
      requestData.append("title", formData.title);
      requestData.append(
        "startTime",
        new Date(formData.startTime).toISOString(),
      );
      requestData.append("endTime", new Date(formData.endTime).toISOString());
      requestData.append("voteMethod", formData.voteMethod);
      requestData.append("icon", iconFile);
      requestData.append("background", backgroundFile);

      candidateFiles.forEach((file) => {
        requestData.append("candidateImages", file);
      });

      const response = await api.post("/vote/new", requestData);

      if (response.status !== 200) throw new Error("Bad response");

      alert("Vote created");
    } catch (error) {
      console.error("Failed to register vote:", error);
      alert("Failed to register vote. Please try again.");
    } finally {
      setUploading(false);
    }
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
          {candidatePreviews.length === 0 ? (
            <Icon size="160px">image_search</Icon>
          ) : (
            candidatePreviews.map(({ name, thumbnail }) => (
              <Character
                key={name}
                id={name}
                thumbnailUrl={thumbnail}
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
