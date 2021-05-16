import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

export enum PromiseState {
  LOADING = "LOADING",
  ERROR = "ERROR",
  DONE = "DONE",
}

interface Props {
  promise: (params: any) => Promise<AxiosResponse<any>>;
  builder: (state: PromiseState, value: any) => JSX.Element;
  params?: any;
}

export const PromiseBuilder = ({ promise, builder, params }: Props) => {
  const [state, setState] = useState(PromiseState.LOADING);
  const [value, setValue] = useState<AxiosResponse<any>>();

  useEffect(() => {
    promise(params)
      .then((response) => {
        setValue(response);
        setState(PromiseState.DONE);
      })
      .catch((error) => {
        console.error(error);
        setState(PromiseState.ERROR);
      });
  }, []);

  return builder(state, value);
};
