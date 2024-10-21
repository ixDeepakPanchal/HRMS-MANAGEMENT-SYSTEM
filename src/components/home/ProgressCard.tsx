import { Card, Progress } from "antd";
interface prop {
  title?: string;
  data: number;
}

function ProgressCard({ title, data }: prop) {
  const getProgressColor = (percent: number) => {
    percent = Number(percent);
    switch (percent) {
      case 100:
        return "#80b918";
      case 80:
        return "#168aad";
      case 60:
        return "#ff8fa3";
      case 40:
        return "#ffd000";
      case 20:
        return "#ff9500";
      default:
        return "#9163cb";
    }
  };
  return (
    <Card className="shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-3">{title} </h3>
      <div className="flex justify-around">
        <ul className="grid grid-cols-1 font-semibold text-sm  list-disc">
          <li className="text-[#80b918]">
            <span className="text-gray-700">Excellent - 100%</span>
          </li>
          <li className="text-[#168aad]">
            <span className="text-gray-700">Good - 80%</span>
          </li>
          <li className="text-[#ff8fa3]">
            <span className="text-gray-700">Average - 60%</span>
          </li>
          <li className="text-[#ffd000]">
            <span className="text-gray-700">Fair - 40%</span>
          </li>
          <li className="text-[#ff9500]">
            <span className="text-gray-700">Poor - 20%</span>
          </li>
        </ul>
        <div>
          <Progress
            strokeWidth={20}
            steps={{ count: 5, gap: 4 }}
            type="dashboard"
            percent={data}
            strokeColor={`${getProgressColor(data)} `}
            trailColor="rgba(0, 0, 0, 0.06)"
            format={(percent) => `${percent}%`}
          />
        </div>
      </div>
    </Card>
  );
}

export default ProgressCard;
