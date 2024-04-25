import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import {Link} from 'gatsby';
import CV from './../images/zoe-daniels-cv-04-2024.pdf'
const Sidebar =()=>{
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author {
              summary
              name
            }
            social {
              linkedin
              github
            }
          }
        }
      }
    `)
    // const socials = [];
    // for(let item in site.siteMetadata.social){
    //   socials.push(<Icon url={site.siteMetadata.social[item]} 
    //     name={item}/>); 
    // }
  return (
    <aside>
      <h1>
        <Link to={`/`}>{site.siteMetadata.author.name}</Link>
      </h1>
      <p className="tagline">{site.siteMetadata.author.summary}</p>
      <div className="cta-container">
        <a href={CV}>Download CV</a>
        <Link to={`/projects`}>View selected projects</Link> 
        <a href="https://www.github.com/zkdan">  View GitHub profile</a>
      </div> 
    </aside>
  )
}

export default Sidebar;