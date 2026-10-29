const sponsors = [
  { name: "YEA", logo: "/images/logos/yea.png" },
  { name: "Gene Haas", logo: "/images/logos/gene-haas.png" },
  { name: "FRCTees", logo: "/images/logos/FRCTees.png" },
  { name: "Lockheed Martin", logo: "/images/logos/lockheed-martin.png" },
  {
    name: "Comcast NBCUniversal",
    logo: "/images/logos/comcast-nbcuniversal.png",
  },
  {
    name: "Fabworks",
    logo: "/images/logos/fabworks.png",
    url: "https://www.fabworks.com/",
  },
];

const COPIES = 4;
const allSponsors = Array(COPIES).fill(sponsors).flat();

export default function SponsorScroller() {
  return (
    <div className="w-full overflow-hidden">
      <style>{`
        @keyframes sponsor-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-${100 / COPIES}%); }
        }
        .sponsor-track {
          animation: sponsor-scroll 10s linear infinite;
        }
        .sponsor-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto overflow-hidden">
        <div className="sponsor-track flex w-max items-center">
          {allSponsors.map((sponsor, index) => (
            <a
              key={`${sponsor.name}-${index}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sponsor.name}
              className="px-4 shrink-0 transition-opacity hover:opacity-80"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-auto max-w-[160px] max-h-[70px] object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
