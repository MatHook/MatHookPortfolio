import React from "react";
import Content from "../components/Content";
import Hero from "../components/Hero";

function AboutPage(props) {
  return (
    <div>
      <Hero title={props.title} />
      <Content>
        <p>
          I am finishing my higher education with a degree in Software Engineer,
          and also have successful experience in startups. Was engaged in
          writing FrontEnd on projects. Here are some of them:
        </p>
        <p>
          <li>
            <b>Mobius </b>is an aggregator of information into a single news
            feed from social networks
          </li>
          <li>
            <b>Amethy</b> is a marketplace for authors
          </li>
          For the purpose of personal growth, I master skills on the BackEnd in
          my personal projects:
          <li>
            <b>HSE Events Calendar</b> - integrator of events into the student's
            calendar
          </li>
          <li>
            <b>AutoSwipeBot</b> - bot for optimizing finding the second half
          </li>
        </p>
        <p>
          I am looking for non-standard solutions and never deviate from my
          plans at the sight of failures, since a team approach to solving
          problems always brings a positive result. I speak English (level C1).
          Lived and worked for half a year in the USA, currently I continue to
          expand my vocabulary and improve my accent.
        </p>
      </Content>
    </div>
  );
}

export default AboutPage;
