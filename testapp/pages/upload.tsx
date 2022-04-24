import { NextPage } from "next";
import { useState } from "react";
import {
  S3Provider,
  WUNDERGRAPH_S3_ENABLED,
} from "../components/generated/wundergraph.web.client";
import { useWunderGraph } from "../components/generated/hooks";
import styles from "../styles/Home.module.css";

const UploadPage: NextPage = () => {
  const [files, setFiles] = useState<FileList>();
  const [data, setData] = useState([]);
  const { client } = useWunderGraph();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };
  const onSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append("files", files[key]);
    }
    const result = await client.uploadFiles({
      provider: S3Provider.minio,
      formData,
    });
    if (result.status === "ok") {
      setData(result.body);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Upload multiple files to any S3 compatible file server</h1>
      <h3>
        Comment out the S3 section in{" "}
        <code>.wundergraph/wundergraph.config.ts:141</code> and run{" "}
        <code>minio/setup.sh</code> to start your own S3 server.
      </h3>
      {!WUNDERGRAPH_S3_ENABLED && (
        <p>Please enable S3 first to be able to upload files.</p>
      )}
      {WUNDERGRAPH_S3_ENABLED && (
        <div>
          <form onSubmit={onSubmit}>
            <input
              id="file-input"
              type="file"
              multiple
              onChange={onFileChange}
            />
            <button type="submit">Submit</button>
          </form>
          <ul>
            {data.map((file) => (
              <li>
                <a
                  target="_blank"
                  href={`http://127.0.0.1:9000/uploads/${file.key}`}
                >
                  {file.key}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
