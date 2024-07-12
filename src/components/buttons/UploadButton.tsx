interface UploadButtonProps {
  onUpload: () => void;
  disabled: boolean;
}

const UploadButton = (props: UploadButtonProps) => {
  const { onUpload, disabled } = props;
  return (
    <button onClick={onUpload} disabled={disabled} className="btn btn-dark">
      Upload
    </button>
  );
};

export default UploadButton;
