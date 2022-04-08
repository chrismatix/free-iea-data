import type { GetStaticPropsResult } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { fetchDataCached } from "../getData";

interface LandingPageProps {
  locale: string;
  localeData: Record<string, string>[]
}

const getMailToLink = (email: string, subject: string, body: string) => {
  // Unfortunately some ministries only support contact forms so we link there instead
  if(email.indexOf("@") === -1) {
    return email.trim();
  }

  return `
  mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}
  `.trim();
};

const twitterIntent = ["https://twitter.com/intent/tweet",
  `?url=${encodeURIComponent("free-iea-data.com")}`,
  "&hashtags=FreeIEAData",
  "&related=skagarroum,ourworldindata,IEA"
].join("");

const Landing = ({ locale, localeData }: LandingPageProps) => {
  const groupedLocaleData: Record<string, Record<string, string>> = localeData.reduce((acc, it) => ({
    ...acc,
    [it.locale]: it
  }), {} as any);

  const makeT = (locale: string) => (key: string) => groupedLocaleData[locale][key] || groupedLocaleData["en-us"][key];
  const t = makeT(locale);

  const { email, flag, country } = groupedLocaleData[locale];
  const [body, setBody] = useState(groupedLocaleData[locale].emailbody);
  const [subject, setSubject] = useState(groupedLocaleData[locale].emailsubject);
  useEffect(() => {
    setBody(groupedLocaleData[locale].emailbody);
    setSubject(groupedLocaleData[locale].emailsubject);
  }, [locale, groupedLocaleData]);


  const mailToLink = getMailToLink(email, subject, body);

  return (
    <div>
      <Head>
        <title>Open climate data to research!</title>
        <meta name="description"
              content="The IEA is withholding publicly funded research that could make a big impact on climate research. Write your government to tell them to drop their paywalls." />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
              integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
              crossOrigin="anonymous" />

        <meta property="og:title" content="Open climate data to research!" />
        <meta property="og:description"
              content="The IEA is withholding publicly funded research that could make a big impact on climate research. Write your government to tell them to drop their paywalls." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/social.jpg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="719" />
        <meta property="og:image:alt"
              content="Open climate data to research with a button saying copy petition to email" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@chrismatisch" />
        <meta name="twitter:title" content="Open climate data to research!" />
        <meta name="twitter:description"
              content="The IEA is withholding publicly funded research that could make a big impact on climate research. Write your government to tell them to drop their paywalls." />
        <meta name="twitter:image" content="https://free-iea-data.com/social.jpg" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="section top-section">
        <div className="container">
          <h1 className="title has-text-centered has-text-white">
            <b>{t("headline")}</b>
          </h1>

          <p className="has-text-centered has-text-white" dangerouslySetInnerHTML={{ __html: t("subline") }} />

          <div className="card mt-6">
            <div className="card-content">
              <div className="is-flex is-flex-direction-column is-align-items-center">
                <div className="dropdown is-hoverable mt-3">
                  <div className="dropdown-trigger">
                    <button
                      className="button central-button-width is-flex is-justify-content-space-between"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu">
                      <span>{flag}{"\t"}{country}</span>
                      <span className="icon is-medium"><i className="fas fa-angle-down" aria-hidden="true" /></span>
                    </button>
                  </div>
                  <div className="dropdown-menu central-button-width" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      {
                        localeData.map(({ country, flag, locale: dataLocale }) =>
                          <Link
                            key={country}
                            href={`/${dataLocale}`}
                            replace
                            locale={false}
                          >
                            <a
                              className={`dropdown-item is-size-6 ${locale === dataLocale && "is-active"}`}
                            >{flag}{"\t"}{country}</a>
                          </Link>)
                      }
                    </div>
                  </div>
                </div>
                <p className="has-text-centered mt-5">{t("explainer")}</p>
                <a className="button mt-5 central-button-width copy-to-email"
                   href={mailToLink}>{t("buttonText")}</a>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="has-text-centered has-text-white">{t("customizer")}</p>
            <p className="has-text-centered has-text-white mt-3">
              <a href="#editor"
                 className="is-underlined has-text-centered has-text-white mt-3">{t("openeditor")}</a>
              <span className="icon is-medium has-text-white"><i className="fas fa-angle-down"
                                                                 aria-hidden="true" /></span>
            </p>
          </div>
        </div>
      </section>

      <section id="editor" className="section">
        <div className="container">
          <div className="field">
            <label className="has-text-white label">{t("subject")}</label>
            <div className="control">
              <input className="input" type="text" value={subject}
                     onChange={(e) => setSubject(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="has-text-white label">{t("body")}</label>
            <div className="control">
                        <textarea className="textarea" rows={10} value={body}
                                  onChange={(e) => setBody(e.target.value)} />
            </div>
          </div>
          <div className="is-flex is-flex-direction-column is-align-items-center">
            <a className="button mt-5 central-button-width copy-to-email"
               href={mailToLink}>{t("buttonText")}</a>
          </div>
        </div>
      </section>

      <section className="section share-section">
        <div className="container">
          <div className="container is-flex is-flex-direction-column is-align-items-center mt-5">
            <h2 className="is-size-1 subtitle has-text-centered"><b>{t("share")}</b></h2>
            <p className="has-text-centered mt-3 is-size-4">{t("shareexplanation")}</p>
            <a className="tweet-button mt-5" href={twitterIntent}>
              <img width={41} src={"/twitter.svg"} alt={"twitter-icon"} />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <Link href={"/impressum"}><a className="has-text-white is-size-6">Impressum</a></Link>
        <a className="has-text-white is-size-6 ml-4" href={"https://github.com/chrismatix/free-iea-data"}>Source
          code</a>
      </footer>
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }): Promise<GetStaticPropsResult<LandingPageProps>> {
  return {
    props: {
      locale,
      localeData: process.env.SHEET_ID ? await fetchDataCached(process.env.SHEET_ID) :
        (() => {
          console.error("No SHEET_ID provided. Proceeding without locale data,");
          process.exit(-1);
        })()
    }
  };
}

export default Landing;

