import * as React from "react"
import Layout from "../components/layout"

const Projects = ({location, siteTitle}) => {
return(
  <Layout location={location} title={siteTitle}>
    <h1>Selected Projects</h1>
        <ul className="projects">
          <li>
            <p>ePlant</p>
            <div className="roles">
              <p>developer</p>
              <p>technical writer</p>
            </div>
            <p>A gene-first visualization tool for plant genomes.</p>
            <div class="link-container">
              <a href="https://bioanalyticresource.github.io/ePlant/">Live link</a>
              <a href="https://github.com/BioAnalyticResource/ePlant">GitHub link</a>
            </div>
          </li>
          <li>
            <p>Cryptoquote</p>
            <div className="roles">
              <p>developer</p>
              <p>designer</p>
            </div>
            <p>An NYT-style word game that allows players to solve on a monoalphabetic substitution cypher to reveal a quote from the <a href="https://github.com/lukePeavey/quotable#quotable">Quotable API</a>.</p>
            <div class="link-container">
              <a href="https://moonlit-lebkuchen-09eeae.netlify.app">Live link</a>          
              <a href="https://github.com/zkdan/cryptoquote">GitHub link</a>
            </div>
          </li>
          {/* <li>
            <p>Little Open Library</p>
            <div className="roles">
              <p>developer</p>
              <p>designer</p>
            </div>
            <p>Using Open Library's APIs to create a directory of books, particularly those that can be searched inside.</p>
            <div class="link-container">
              <a href="https://leafy-buttercream-594bfb.netlify.app">Live link</a>
              <a href="https://github.com/zkdan/little-open-library">GitHub link</a>
            </div>
          </li> */}
          <li>
            <p>lariat.work</p>
            <div className="roles">
              <p>developer</p>
              <p>designer</p>
              <p>artist</p>
            </div>
            <p>Image gallery of handmade collages.</p>
            <div class="link-container">
              <a href="https://www.lariat.work">Live link</a>
              <a href="https://github.com/zkdan/lariat">GitHub link</a>
            </div>
          </li>
        </ul>
  </Layout>
)
}
export default Projects;