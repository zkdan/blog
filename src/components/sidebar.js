import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import {Link} from 'gatsby';
import Icon from './icon.js';
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
              twitter
              github
            }
          }
        }
      }
    `)
    const socials = [];
    for(let item in site.siteMetadata.social){
      socials.push(<Icon url={site.siteMetadata.social[item]} 
        name={item}/>); 
    }
  return (
    <aside>
      <h1>
        <Link to={`/`}>{site.siteMetadata.author.name}</Link>
      </h1>
      <p className="tagline">{site.siteMetadata.author.summary}</p>
      <ul className="socials">
        {socials}
      </ul>
    </aside>
  )
}

export default Sidebar;