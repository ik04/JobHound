import Image from "next/image";

export default function Home() {
  const sites = [
    { title: "YCombinator", link: "https://www.ycombinator.com/" },
    { title: "Peerlist", link: "https://peerlist.io/" },
    { title: "WWR", link: "https://weworkremotely.com/" },
    { title: "Remoteok", link: "https://remoteok.com/" },
    { title: "Wellfound", link: "https://wellfound.com/" },
    { title: "x", link: "X.com" },
    { title: "Linkedin", link: "https://www.linkedin.com" },
  ];
  return <div className="h-screen bg-white"></div>;
}
// * the goal of this project is to keep me consistent with applying everyday
// * i'll have an apply counter, this board of links to refer to
// * a page storing my resume and a page to store and edit cold emails
