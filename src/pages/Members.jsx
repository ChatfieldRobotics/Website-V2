import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Members() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  const fadeDown = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const members = [
    {
      id: "andy-he",
      name: "Andy He",
      role: "Programming",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139420/Andy_He_fsqohr.jpg",
      bio: "I’m Andy, and I hope to be part of the programming team. I really love eggrolls (they're a top-tier food). What I enjoy about robotics is creating cool devices that can act without me needing to physically move each part — automation is satisfying. My favorite color is blue. In five years, I’m not sure I’ll be making robots — I might be making money instead (haha). What motivates me is dreaming up inventions that help others do what they can’t do now (and yes, laziness is a strong motivator for automating things).",
    },
    {
      id: "andrew-albright",
      name: "Andrew Albright",
      role: "Mechanical",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139421/Andrew_Albright_eh1jdi.jpg",
      bio: "I’m Andrew, a programmer on the team. My dream is to become an aerospace engineer. What really pulls me into robotics is the problem solving — taking something complex, breaking it down, and making it work. My favorite color is brown. In five years I hope to be either in college or pushing limits in robotics and in life, is my love for the game — the thrill of challenging myself and seeing results.",
    },
    {
      id: "annabelle-tanaka",
      name: "Annabelle Tanaka",
      role: "Marketing",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139423/Annabelle_Tanaka_gfvp3z.jpg",
      bio: "I’m Annabelle — I serve as the marketing lead, vice president, and a programmer. I love reading and writing, but I’ve also surprised myself by really enjoying the more technical side of robotics. What draws me in most is the people I work with, and the chance to learn both coding and marketing. My favorite color is blue. In five years, I hope to be at a good college studying something like creative writing or education. What motivates me in robotics, and outside it, is that I don’t want to let my team down — and I want to prove to myself and others that I can do as much as anyone else, even while facing my own challenges.",
    },
    {
      id: "azariah-adams-pacheco",
      name: "Azariah Adams-Pacheco",
      role: "Mechanical",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139426/Azariah_Adams-Pacheco_fktwpg.jpg",
      bio: "Hey — I’m Azariah, working on the mechanical side of things. I’ve always loved CAD, and I’ve set my sights on becoming an aerospace engineer someday. What I enjoy most about robotics is getting to work with tools like CAD and meeting all the different people who are passionate about it. Purple is my favorite color. In five years, I see myself at the Colorado School of Mines. What really motivates me is the friendships I build through robotics, and the potential to turn my interests into something real.",
    },
    {
      id: "bill-kendall",
      name: "Bill Kendall",
      role: "Mentor",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139421/Bill_Kendall_i77mfi.jpg",
      bio: "My name is Bill, and I’m the lead mentor. I’ve been mentoring in FIRST (FRC) for 21 years. What I love most is watching students grow, learn, and tackle challenges they never thought possible. My favorite color is blue. In five years, I’ll be fully retired (or continuing mentoring, as I already plan to). What motivates me is my faith in my Lord and Savior, and seeing young people find confidence and skills through robotics.",
    },
    {
      id: "daniel-brunson",
      name: "Daniel Brunson",
      role: "Mentor",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139420/Daniel_Brunson_zix0cg.jpg",
      bio: "I’m Daniel, a mentor. When I was in high school, FRC was a huge source of inspiration for me, so I wanted to give back by mentoring. My favorite color is Kelly green. In five years I see myself still mentoring for this team, helping new generations learn and grow. What keeps me motivated is my family — my wife, my friends — and the desire to keep learning alongside the students.",
    },
    {
      id: "evan-pacic",
      name: "Evan Pacic",
      role: "Mentor",
      image: "/images/team_members/placeholder.jpg",
      bio: "Hi, I’m Evan — a mechanical mentor and current mechanical engineering undergrad. I think robotics is an amazing large-scale collaborative challenge, and I love the sense of teamwork and problem-solving that comes with it. My favorite color is blue. In five years, I hope to be working in a field related to robotics or controls. What motivates me is the chance to keep learning, share knowledge, and build community through engineering.",
    },
    {
      id: "ross-parrent",
      name: "Ross Parrent",
      role: "Mentor",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139420/Daniel_Brunson_zix0cg.jpg",
      bio: "I'm Ross, a mentor. What draws me to this role is the chance to watch students grow and tackle challenges while sharing the professional experience I've built over the years. My favorite color is blue. In five years, I hope to be pushing the boundaries of large scale, technology infrastructure. What motivates me most is the relationships I build with the students along the way.",
    },
    {
      id: "henry-wagner",
      name: "Henry Wagner",
      role: "Programming Lead",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139416/Henry_Wagner_ddopdk.png",
      bio: "I’m Henry, a programmer. I like programming, math, and engineering — basically anything that challenges my mind. Solving complex problems is my jam. My favorite color is the hex color #228B22 (forest green). In five years, I see myself working at a place like Lockheed Martin, maybe designing heat-seeking drones. What motivates me is “the thrill of the game” — the push to win, to perfect, to innovate.",
    },
    {
      id: "jamie-head",
      name: "Jamie Head",
      role: "Mechanical",
      image: "/images/team_members/NEEDTOGET.jpg",
      bio: "Hello, I’m Jamie. I’m vice president of mechanical. I like “droids” — really. One of my big goals is to someday build a droid army. My favorite color is green. In five years I hope to (depending on how this all goes) be studying mechanical engineering or be active in some robotics projects. What motivates me? Well … part of it is the money, and maybe some recognition. Also, I can’t deny: the motivation of impressing people (and women) drives me too.",
    },
    {
      id: "katie-stanley",
      name: "Katie Stanley",
      role: "Lead Mechanical / Club President",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139417/Katie_Stanley_hc0sx5.jpg",
      bio: "I’m Katie, the club president and lead mechanical engineer. I enjoy crocheting, listening to music (especially rock), and playing instruments. Robotics gives me that feeling of belonging, working alongside great people and building something meaningful. My favorite color is purple. In five years I’ll be graduating from Mines with a degree in biotechnical engineering (or something similar). What fuels me is that feeling of success in competitions — when things go right, it’s amazing.",
    },
    {
      id: "keegan-oneil",
      name: "Keegan O'Neil",
      role: "Mechanical",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139416/Keegan_O_Neil_ozrpnb.jpg",
      bio: "I’m Keegan on the mechanical side. I like going to school, especially math and science. Outside the classroom, I’m really into gymnastics, and I snowboard when I can. I love building things. My favorite color is gray. In five years I hope to be in college, continually working to become my best self. What motivates me is my work ethic — always wanting to grow — and striving to improve at everything I do.",
    },
    {
      id: "liam-martin",
      name: "Liam Martin",
      role: "Mechanical",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139976/Liam_Martin_ir6ed9.jpg",
      bio: "I’m Liam, working on mechanical. Honestly, I’m still figuring a lot out about robotics — but I know I like it. My favorite color is red. I don’t know precisely where I’ll be in five years, but I do know that robotics is fun, and I don’t always get the chance to do it elsewhere. That excitement — the chance to be hands-on — is what draws me in.",
    },
    {
      id: "quinn-johnson",
      name: "Quinn Johnson",
      role: "Mechanical",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139421/Quinn_Johnson_bli5or.jpg",
      bio: "Hey, I’m Quinn, though I’m still figuring out my formal role here. I like hardware and mechanical stuff. What I enjoy about robotics is the creativity — being able to imagine something, then build it with my own hands. My favorite color is green. In five years I hope to be in college. What motivates me is the need to learn, to improve, to be smart and capable.",
    },
    {
      id: "tyler-bergsma",
      name: "Tyler Bergsma",
      role: "Programming",
      image:
        "https://res.cloudinary.com/dfe5w9fih/image/upload/v1762139415/Tyler_Bergsma_j4uarq.jpg",
      bio: "Hey, I'm Tyler and I work on programming the robot — and at the moment the website. I love to tinker with things like my 3D-printers or my servers in my free time. My favorite color is definitely teal. I also love games; a few of my favorites are Titanfall 2 and The Finals. In a few years I see myself in a college like MIT or CalTech.",
    },
  ];

  return (
    <>
      <style>{`
        #cards {
          --numcards: ${members.length};
          position: relative;
        }

        .card {
          position: relative;
          min-height: 520px;
        }

        .card__content {
          position: sticky;
          top: 200px;
          z-index: 1;
          width: 100%;
          box-sizing: border-box;
        }

        .card:nth-child(1) .card__content {
          z-index: 1;
        }

        .card:nth-child(2) .card__content {
          z-index: 2;
        }

        .card:nth-child(3) .card__content {
          z-index: 3;
        }

        .card:nth-child(4) .card__content {
          z-index: 4;
        }

        .card:nth-child(5) .card__content {
          z-index: 5;
        }

        .card:nth-child(6) .card__content {
          z-index: 6;
        }

        .card:nth-child(7) .card__content {
          z-index: 7;
        }

        .card:nth-child(8) .card__content {
          z-index: 8;
        }

        .card:nth-child(9) .card__content {
          z-index: 9;
        }

        .card:nth-child(10) .card__content {
          z-index: 10;
        }

        .card:nth-child(11) .card__content {
          z-index: 11;
        }

        .card:nth-child(12) .card__content {
          z-index: 12;
        }

        .card:nth-child(13) .card__content {
          z-index: 13;
        }

        .card:nth-child(14) .card__content {
          z-index: 14;
        }

        .card:nth-child(15) .card__content {
          z-index: 15;
        }

        @media (max-width: 768px) {
          .card {
            min-height: 580px;
          }

          .card__content {
            top: 125px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card__content {
            position: relative;
            top: auto;
          }
        }
      `}</style>

      <motion.div
        className="bg-[#F8F5F2] min-h-screen py-8 px-4 sm:px-6 md:px-8"
        initial="hidden"
        animate="visible"
        variants={fadeDown}
      >
        <div id="cards" className="w-full md:w-4/5 mx-auto">
          {members.map((member, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div key={member.id} id={member.id} className="card">
                <div
                  className={`card__content ${
                    isReversed ? "md:flex-row-reverse" : "md:flex-row"
                  } bg-[#8B1E3F] rounded-md border-[#264653] border-2 text-white p-4 flex flex-col items-center md:items-start`}
                >
                  <img
                    src={member.image}
                    className="w-full max-w-[250px] md:max-w-[300px] rounded-md mb-4 md:mb-0 md:mx-4"
                    alt={member.name}
                  />

                  <div className="w-full md:w-3/5 text-left text-sm sm:text-base leading-relaxed">
                    <h2 className="text-2xl font-bold mb-2">{member.name}</h2>

                    <h3 className="font-semibold mb-2">{member.role}</h3>

                    <p>{member.bio}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
