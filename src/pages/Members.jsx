import { motion } from "framer-motion"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function Members() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [location])

  const fadeDown = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const cardBase =
    "bg-[#8B1E3F] rounded-md border-[#264653] border-2 text-white p-4 flex flex-col md:flex-row items-center md:items-start"
  const cardAlt =
    "bg-[#8B1E3F] rounded-md border-[#264653] border-2 text-white p-4 flex flex-col md:flex-row-reverse items-center md:items-start"
  const imgBase =
    "w-full max-w-[250px] md:max-w-[300px] rounded-md mb-4 md:mb-0 md:mx-4"
  const textBase = "w-full md:w-3/5 text-left text-sm sm:text-base leading-relaxed"

  return (
    <motion.div
      className="bg-[#F8F5F2] min-h-screen py-8 px-4 sm:px-6 md:px-8"
      initial="hidden"
      animate="visible"
      variants={fadeDown}
    >
      <div className="w-full md:w-4/5 mx-auto grid gap-8">

        {/* Andy He */}
        <div id="andy-he" className={cardBase}>
          <img src="/images/team_members/Andy_He.jpg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">Andy He</p>
            <p className="text-base sm:text-[18px] mb-2">Programming</p>
            <p>
              I’m Andy, and I hope to be part of the programming team. I really love
              eggrolls (they're a top-tier food). What I enjoy about robotics is
              creating cool devices that can act without me needing to physically move
              each part — automation is satisfying. My favorite color is blue. In five
              years, I’m not sure I’ll be making robots — I might be making money
              instead (haha). What motivates me is dreaming up inventions that help
              others do what they can’t do now (and yes, laziness is a strong motivator
              for automating things).
            </p>
          </div>
        </div>

        {/* Andrew Albright */}
        <div id="andrew-albright" className={cardAlt}>
          <img src="/images/team_members/Andrew_Albright.jpg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">
              Andrew Albright
            </p>
            <p className="text-base sm:text-[18px] mb-2">Mechanical</p>
            <p>
              I’m Andrew, a programmer on the team. My dream is to become an aerospace
              engineer. What really pulls me into robotics is the problem solving —
              taking something complex, breaking it down, and making it work. My
              favorite color is brown. In five years I hope to be either in college or
              pushing limits until I’m, well, “dead from trying.” What drives me, both
              in robotics and in life, is my love for the game — the thrill of
              challenging myself and seeing results.
            </p>
          </div>
        </div>

        {/* Annabelle Tanaka */}
        <div id="annabelle-tanaka" className={cardBase}>
          <img src="/images/team_members/Annabelle_Tanaka.jpg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">
              Annabelle Tanaka
            </p>
            <p className="text-base sm:text-[18px] mb-2">Marketing</p>
            <p>
              I’m Annabelle — I serve as the marketing lead, vice president, and a
              programmer. I love reading and writing, but I’ve also surprised myself by
              really enjoying the more technical side of robotics. What draws me in
              most is the people I work with, and the chance to learn both coding and
              marketing. My favorite color is blue. In five years, I hope to be at a
              good college studying something like creative writing or education. What
              motivates me in robotics, and outside it, is that I don’t want to let my
              team down — and I want to prove to myself and others that I can do as
              much as anyone else, even while facing my own challenges.
            </p>
          </div>
        </div>

        {/* Azariah Adams-Pacheco */}
        <div id="azariah-adams-pacheco" className={cardAlt}>
          <img src="/images/team_members/Azariah_Adams-Pacheco.jpg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">
              Azariah Adams-Pacheco
            </p>
            <p className="text-base sm:text-[18px] mb-2">Mechanical</p>
            <p>
              Hey — I’m Azariah, working on the mechanical side of things. I’ve always
              loved CAD, and I’ve set my sights on becoming an aerospace engineer
              someday. What I enjoy most about robotics is getting to work with tools
              like CAD and meeting all the different people who are passionate about
              it. Purple is my favorite color. In five years, I see myself at the
              Colorado School of Mines. What really motivates me is the friendships I
              build through robotics, and the potential to turn my interests into
              something real.
            </p>
          </div>
        </div>

        {/* Bill Kendall */}
        <div id="bill-kendall" className={cardBase}>
          <img src="/images/team_members/Bill_Kendall.jpg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">Bill Kendall</p>
            <p className="text-base sm:text-[18px] font-bold mb-2">Mentor</p>
            <p>
              My name is Bill, and I’m the lead mentor. I’ve been mentoring in FIRST
              (FRC) for 21 years. What I love most is watching students grow, learn, and
              tackle challenges they never thought possible. My favorite color is blue.
              In five years, I’ll be fully retired (or continuing mentoring, as I
              already plan to). What motivates me is my faith in my Lord and Savior, and
              seeing young people find confidence and skills through robotics.
            </p>
          </div>
        </div>

        {/* Daniel Brunson */}
        <div id="daniel-brunson" className={cardAlt}>
          <img src="/images/team_members/Daniel_Brunson.jpeg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">
              Daniel Brunson
            </p>
            <p className="text-base sm:text-[18px] font-bold mb-2">Mentor</p>
            <p>
              I’m Daniel, a mentor. When I was in high school, FRC was a huge source of
              inspiration for me, so I wanted to give back by mentoring. My favorite
              color is Kelly green. In five years I see myself still mentoring for this
              team, helping new generations learn and grow. What keeps me motivated is
              my family — my wife, my friends — and the desire to keep learning
              alongside the students.
            </p>
          </div>
        </div>

        {/* Evan Pacic */}
        <div id="evan-pacic" className={cardBase}>
          <img src="/images/team_members/NEEDTOGET.jpg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">Evan Pacic</p>
            <p className="text-base sm:text-[18px] font-bold mb-2">Mentor</p>
            <p>
              I’m Evan, a mechanical mentor. Right now I’m an undergrad in mechanical
              engineering, and I cherish my experience in FRC as a student, so I’m here
              to help current students get the most out of it. I believe robotics is a
              huge collaborative engineering challenge, and I love the tight community
              that comes with it. My favorite color is blue. In five years, I hope I’m
              working in something related to robotics or controls. What motivates me is
              that sense of community, learning, and passing on what I’ve gained.
            </p>
          </div>
        </div>

        {/* Henry Wagner */}
        <div id="henry-wagner" className={cardAlt}>
          <img src="/images/team_members/Henry_Wagner.png" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">Henry Wagner</p>
            <p className="text-base sm:text-[18px] mb-2">Programming Lead</p>
            <p>
              I’m Henry, a programmer. I like programming, math, and engineering —
              basically anything that challenges my mind. Solving complex problems is my
              jam. My favorite color is the hex color #228B22 (forest green). In five
              years, I see myself working at a place like Lockheed Martin, maybe
              designing heat-seeking drones. What motivates me is “the thrill of the
              game” — the push to win, to perfect, to innovate.
            </p>
          </div>
        </div>

        {/* Jamie Head */}
        <div id="jamie-head" className={cardBase}>
          <img src="/images/team_members/NEEDTOGET.jpg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">Jamie Head</p>
            <p className="text-base sm:text-[18px] mb-2">Mechanical</p>
            <p>
              Hello, I’m Jamie. I’m vice president of mechanical. I like “droids” —
              really. One of my big goals is to someday build a droid army. My favorite
              color is green. In five years I hope to (depending on how this all goes)
              be studying mechanical engineering or be active in some robotics projects.
              What motivates me? Well … part of it is the money, and maybe some
              recognition. Also, I can’t deny: the motivation of impressing people (and
              women) drives me too.
            </p>
          </div>
        </div>

        {/* Katie Stanley */}
        <div id="katie-stanley" className={cardAlt}>
          <img src="/images/team_members/Katie_Stanley.jpeg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">Katie Stanley</p>
            <p className="text-base sm:text-[18px] mb-2">
              Lead Mechanical / Club President
            </p>
            <p>
              I’m Katie, the club president and lead mechanical engineer. I enjoy
              crocheting, listening to music (especially rock), and playing instruments.
              Robotics gives me that feeling of belonging, working alongside great
              people and building something meaningful. My favorite color is purple. In
              five years I’ll be graduating from Mines with a degree in biotechnical
              engineering (or something similar). What fuels me is that feeling of
              success in competitions — when things go right, it’s amazing.
            </p>
          </div>
        </div>

        {/* Keegan O'Neil */}
        <div id="keegan-oneil" className={cardBase}>
          <img src="/images/team_members/Keegan_O'Neil.jpeg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">Keegan O'Neil</p>
            <p className="text-base sm:text-[18px] mb-2">Mechanical</p>
            <p>
              I’m Keegan on the mechanical side. I like going to school, especially math
              and science. Outside the classroom, I’m really into gymnastics, and I
              snowboard when I can. I love building things. My favorite color is gray.
              In five years I hope to be in college, continually working to become my
              best self. What motivates me is my work ethic — always wanting to grow —
              and striving to improve at everything I do.
            </p>
          </div>
        </div>

        {/* Liam Martin */}
        <div id="liam-martin" className={cardAlt}>
          <img src="/images/team_members/STILLNEED.jpeg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">Liam Martin</p>
            <p className="text-base sm:text-[18px] mb-2">Mechanical</p>
            <p>
              I’m Liam, working on mechanical. Honestly, I’m still figuring a lot out
              about robotics — but I know I like it. My favorite color is red. I don’t
              know precisely where I’ll be in five years, but I do know that robotics is
              fun, and I don’t always get the chance to do it elsewhere. That excitement
              — the chance to be hands-on — is what draws me in.
            </p>
          </div>
        </div>

        {/* Quinn Johnson */}
        <div id="quinn-johnson" className={cardBase}>
          <img src="/images/team_members/Quinn_Johnson.jpeg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">
              Quinn Johnson
            </p>
            <p className="text-base sm:text-[18px] mb-2">Mechanical</p>
            <p>
              Hey, I’m Quinn, though I’m still figuring out my formal role here. I like
              hardware and mechanical stuff. What I enjoy about robotics is the
              creativity — being able to imagine something, then build it with my own
              hands. My favorite color is green. In five years I hope to be in college.
              What motivates me is the need to learn, to improve, to be smart and
              capable.
            </p>
          </div>
        </div>

        {/* Tyler Bergsma */}
        <div id="tyler-bergsma" className={cardAlt}>
          <img src="/images/team_members/Tyler_Bergsma.jpg" className={imgBase} />
          <div className={textBase}>
            <p className="text-lg sm:text-xl font-semibold text-[#E9C46A]">
              Tyler Bergsma
            </p>
            <p className="text-base sm:text-[18px] mb-2">Programming</p>
            <p>
              Hey, I'm Tyler and I work on programming the robot — and at the moment the
              website. I love to tinker with things like my 3D-printers or my servers in
              my free time. My favorite color is definitely teal. I also love games; a
              few of my favorites are Titanfall 2 and The Finals. In a few years I see
              myself in a college like MIT or CalTech.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
