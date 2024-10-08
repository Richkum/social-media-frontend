import Header from "../../components/landingPage/header/Header.";
import MainContent from "../../components/landingPage/mainCont/MainContext.jsx";
import Footer from "../../components/landingPage/footer/Footer.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  });
  return (
    <div>
      {/* <Header /> */}
      <MainContent />
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
