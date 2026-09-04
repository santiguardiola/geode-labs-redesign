import { EssayPreviewList } from "@/components/EssayPreviewList";

const articles = {
  map: (_render: (article: readonly [string, string]) => React.ReactNode) => <EssayPreviewList />,
};
const tags = ["R&D", "Education", "Community", "New Experiments"];
const Link = ({ children }: { children: React.ReactNode }) => (
  <a href="#" className="text-link">{children}</a>
);

function Work({
  id, eyebrow, title, body, image, flip, subtle, tagList,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  flip?: boolean;
  subtle?: boolean;
  tagList?: string[];
}) {
  const media = <img className="work-media" src={image} alt="" loading="lazy" decoding="async" />;
  const copy = (
    <div className="work-copy">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{body}</p>
      {tagList && <div className="tags">{tagList.map((tag) => <span key={tag}>{tag}</span>)}</div>}
      <Link>
        {title === "Local Ethereum"
          ? "Read Local Ethereum ↗"
          : title === "Grant Program"
            ? "Explore the grant program ↗"
            : "Explore our products ↗"}
      </Link>
    </div>
  );

  return (
    <section id={id} className={`work ${subtle ? "subtle" : ""}`}>
      <div className="container work-grid">{flip ? <>{copy}{media}</> : <>{media}{copy}</>}</div>
    </section>
  );
}

export function LandingPage() {
  return (
    <div id="landing" className="landing">
      <div className="landing-reveal" data-landing-reveal>
        <header className="nav">
          <div className="container nav-inner">
            <img src="/assets/geode-logo.png" alt="Geode Labs" />
            <div className="nav-links"><Link>Work</Link><Link>Grants</Link><Link>Newsletter</Link></div>
            <a className="button" href="#support">Donate ↗</a>
          </div>
        </header>

        <section className="intro">
          <div className="container intro-layout">
            <div className="intro-copy">
              <span className="eyebrow">WHAT WE DO</span>
              <h2>Building Ethereum’s global talent layer</h2>
              <p className="intro-support">Building the infrastructure behind Ethereum’s global talent.</p>
              <p className="intro-body">Geode Labs builds products, programs, and funding pathways that help Ethereum builders, communities, and researchers connect, grow, and keep building — across geographies.</p>
            </div>
            <img className="intro-brand" src="/assets/geode-imagotipo.png" alt="Geode Labs" />
          </div>
          <div className="container intro-metrics">
            <div className="intro-divider" />
            <div className="intro-metrics-row">
              <div className="intro-metric"><strong>56</strong><span>Supported projects</span></div>
              <div className="intro-metric"><strong>4</strong><span>Focus areas</span></div>
              <div className="intro-metric"><strong>GLOBAL</strong><span>Ethereum ecosystem</span></div>
            </div>
          </div>
        </section>

        <Work
          id="work"
          eyebrow="PRODUCT STUDIO"
          title="Product Studio"
          body="Building community infrastructure that makes Ethereum more resilient."
          image="/assets/product-studio.png"
          subtle
        />
      </div>

      <Work
        id="grants"
        eyebrow="GRANT PROGRAM"
        title="Grant Program"
        body="We fund high-impact work and early experiments that grow Ethereum’s global talent layer."
        image="/assets/grants.png"
        flip
        tagList={tags}
      />
      <Work
        id="local"
        eyebrow="LOCAL ETHEREUM"
        title="Local Ethereum"
        body="Tracking global Ethereum R&D, regional adoption, local communities, and ecosystem updates."
        image="/assets/local-ethereum.png"
        subtle
      />

      <section className="essays">
        <div className="container essays-grid">
          <div className="essays-intro">
            <span className="mono">LOCAL ETHEREUM</span>
            <h2>Global Ethereum R&amp;D and regional adoption updates.</h2>
            <Link>Read all essays ↗</Link>
          </div>
          {articles.map(([title, category]) => (
            <a href="#" className="article" key={title}>
              <h3>{title}</h3>
              <span>{category}</span>
              <img src="/assets/arrow-up-right.svg" alt="" />
            </a>
          ))}
        </div>
      </section>

      <section id="support" className="support">
        <div className="container">
          <div className="support-card">
            <div>
              <img src="/assets/ethereum.svg" alt="Ethereum" loading="lazy" decoding="async" />
              <h2>Support the work onchain</h2>
              <p>Donations fund the work.</p>
              <p className="support-note">Works with any Ethereum wallet. Accepts ETH, stablecoins, and other tokens on Ethereum mainnet and L2s.</p>
              <span className="mono">geodelabs.eth</span>
              <a className="button" href="#">Donate ↗</a>
            </div>
            <div className="qr mono">QR</div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-main">
          <div>
            <img className="footer-logo" src="/assets/geode-logo.png" alt="Geode Labs" loading="lazy" decoding="async" />
            <p>Ethereum ecosystem development and product studio.</p>
          </div>
          <div className="footer-links">
            <p><b>Explore</b><br />Work · Grants · Newsletter</p>
            <p><b>Support</b><br />Donate · geodelabs.eth</p>
            <p><b>Company</b><br />About · Contact</p>
          </div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Geode Labs</span><span>Terms · Privacy · X · LinkedIn</span></div>
      </footer>
    </div>
  );
}
