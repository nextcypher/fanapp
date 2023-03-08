import Container from "components/Shared/Container";
import logoImg from "../../../assets/images/next_cyber_logo.png";

const Footer = () => {
  return (
    <div className="w-full border-t-[1px] border-solid border-[#575757]">
      <Container className="flex flex-row py-[2.7rem] items-center">
        <img src={logoImg} alt="LogoImage" className="md:h-[28px] h-[22px]" />
        <div className="flex-1" />
        <p className="font-[Outfit] text-white md:text-[1.5rem] text-[1.1rem] font-normal">
          © 2023 Next Cypher. All rights reserved.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
