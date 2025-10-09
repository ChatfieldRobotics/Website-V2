import Carousel from '/src/components/Carousel'

export default function Home() {
    return (
        <>
            <Carousel images="/images/Carousel_1.jpg,/images/Carousel_2.jpg,/images/Carousel_3.jpg"></Carousel>
            <br/>
            
            
            <div className="flex flex-col items-center bg-[#800020] w-4/5 rounded-lg mx-auto p-4">
                <h2 className="w-full text-center text-gray-300 text-2xl underline mb-4">About Us</h2>
                <b className="text-justify text-white font-light">
                Chatfield Robotics was founded in 2018 to participate in the FIRST Tech Challenge (FTC), and now competes in FIRST Robotics Competition (FRC) as Team 9068 The Chargers. The team is student-run and operates out of Chatfield Senior High School, striving to prepare students for excellence in STEM through the development of industry-level skills in engineering, programming, marketing, and leadership fields. Chatfield Robotics also seeks to inspire a passion for STEM in the community via numerous community outreach programs, including cooperation with local organizations and STEM summer camps for middle school students.
                </b>
            </div>
            <br/>
        </>
    )
}