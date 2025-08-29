import { useNavigate } from 'react-router';

function BackButton() {
  const navigate = useNavigate();

  function handleGoBack() {
    void navigate(-1);
  }
  return (
    <button className="back-button" onClick={handleGoBack}>
      Go back
    </button>
  );
}

export default BackButton;
