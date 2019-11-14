import Layout from "./layout"
import Loading from "./loading";

const MafiaPresentation = ({ role, error }) => (
  <Layout>
    <div className="container-column container__align-center" style={!error && role !== 'Empty' ? {} : { display: 'none' }}>
      <div className="flex-item">You are the</div>
      <div className="flex-item"><h1>{role ? role : <Loading />}</h1></div>
    </div>
    <div className="container-column container__align-center" style={role === 'Empty' ? {} : { display: 'none' }}>
      <div className="flex-item">Game is out of Players.</div>
    </div>
    <div className="container-column container__align-center" style={error && error.length ? {} : { display: 'none' }}>
      <div className="flex-item">An error occured.</div>
    </div>
  </Layout>
);

export default MafiaPresentation;