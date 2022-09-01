import ContentLoader from 'react-content-loader';

function Sekelton() {
  return (
    <div className="product-block-wrapper">
      <ContentLoader
        width={250}
        height={443}
        viewBox="0 0 250 443"
        speed={2}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="0" y="0" rx="0" ry="0" width="250" height="250" />
        <rect x="15" y="260" rx="3" ry="3" width="220" height="27" />
        <rect x="90" y="297" rx="3" ry="3" width="70" height="19" />
        <rect x="0" y="327" rx="0" ry="0" width="250" height="50" />
        <rect x="117" y="407" rx="5" ry="5" width="110" height="36" />
        <rect x="15" y="412" rx="3" ry="3" width="77" height="25" />
      </ContentLoader>
    </div>
  );
}

export default Sekelton;
