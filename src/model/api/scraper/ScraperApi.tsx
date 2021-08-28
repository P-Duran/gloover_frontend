import axios from "axios";
const ip = "localhost";
interface Props {
  url: string;
  max_requests: number;
  spider_name: "amazon";
  trigger: "date";
  test?: boolean;
}
export const scrapeProduct = (props: Props) => {
  var bodyFormData = new FormData();
  Object.entries(props).forEach((entrie) =>
    bodyFormData.append(entrie[0], entrie[1])
  );
  // bodyFormData.append("test", 'true');
  return axios({
    method: "post",
    url: "http://" + ip + ":9080/scrape",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const jobsEventSource = new EventSource(
  "http://" + ip + ":9080/jobs?stream=true"
);
