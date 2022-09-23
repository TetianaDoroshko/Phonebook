import { ThreeDots } from 'react-loader-spinner';

export const Spinner = () => (
  <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="cornflowerblue"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
  />
);
export const SpinnerForButton = () => (
  <ThreeDots
    height="14"
    width="50"
    radius="9"
    color="cornflowerblue"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
  />
);
