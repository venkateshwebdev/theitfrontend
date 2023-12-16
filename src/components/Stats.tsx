import React from "react";
import SparkIcon from "../icons/SparkIcon";
import HeartIcon from "../icons/HeartIcon";
import InfoIcon from "../icons/InfoIcon";
import SettingsIcon from "../icons/SettingsIcon";

const StatBar = (props: {
  header: string;
  title: string;
  footer: string;
  type: "primary" | "secondary" | "normal";
  icon: React.ReactNode;
}) => {
  const { header, title, footer, type, icon } = props;
  // pick text color based on the type provided.
  const color =
    type === "primary"
      ? "text-primary"
      : type === "secondary"
      ? "text-secondary"
      : "";
  return (
    <div className={`stat ${color}`}>
      <div className="stat-figure">{icon}</div>
      <div className="stat-title">{header}</div>
      <div className={"stat-value"}>{title}</div>
      <div className="stat-desc">{footer}</div>
    </div>
  );
};

const Stats = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 bg-base-200 rounded-md shadow">
      <StatBar
        header="Front End"
        title="React"
        footer="React with tailwindcss"
        type="secondary"
        icon={<HeartIcon />}
      />
      <StatBar
        header="Backend"
        title="NodeJS"
        footer="Nodejs Expressjs with typescript"
        type="primary"
        icon={<SparkIcon />}
      />
      <StatBar
        header="Database"
        title="Postgres"
        footer="Postgres sql database to store data"
        type="normal"
        icon={<InfoIcon />}
      />
      <StatBar
        header="Language"
        title="TS"
        footer="Used typescipt as primary language"
        type="primary"
        icon={<SettingsIcon />}
      />
    </div>
  );
};

export default Stats;
