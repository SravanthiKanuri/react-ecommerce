

function PriceTag(props) {
    function formatPrice(price) {
        return parseFloat(price).toFixed(2)
    }
    return (
      <>
        <div>
            <span className="material-icons-outlined">currency_rupee</span>
            <span>{formatPrice(props.price)}</span>
        </div>
      </>
    );
  }
  
  export default PriceTag;
  