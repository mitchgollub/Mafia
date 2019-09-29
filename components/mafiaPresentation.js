import Layout from "./layout"
import Loading from "./loading";

const MafiaPresentation = ({ character }) => (
  <Layout>
    <div className="container-column container__align-center">
      <div className="flex-item">You are the</div>
      <div className="flex-item"><h1>{character ? character : <Loading />}</h1></div>
    </div>
  </Layout>
);

export default MafiaPresentation;