import { ReactNode, Children } from "react";

interface EachItemRenderProps<T> {
  render: (item: T) => JSX.Element;
  of: T[];
}

const Each = <T,>({ render, of }: EachItemRenderProps<T>): ReactNode =>
  Children.toArray(of.map((item: T) => render({ ...item })));

export { Each }; // Correct export
