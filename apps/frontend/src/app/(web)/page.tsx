import Image from "next/image";

export default function HomePage() {
  

  return (
    <>
      <div className="">
        <p className="text-center">Home</p>
        <nav>
          <ul>
            <li><a href="/games">Games</a></li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
