import { PaginationaBtn } from "./Button.styled";

export const Pagination = ({ onClick, children }) => {
  return (
    <>
      <PaginationaBtn onClick={onClick}>{children}</PaginationaBtn>
    </>
  );
};
