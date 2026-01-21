import { connect } from "react-redux";
import Home from "../components/Home";
import { addToCart } from "../Services/Actions/actions";

const mapStateToProps = (state: any) => {
    return {
        cardData: state.cardItems.cardData,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    addToCartHandler: (data) => dispatch(addToCart(data));
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
