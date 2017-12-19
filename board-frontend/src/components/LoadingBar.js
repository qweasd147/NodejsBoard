import React from 'react';
//import PropTypes from 'prop-types';

class LoadingBar extends React.Component {
    render() {

        const LoadingBarCss = {
            position: 'fixed'
            , left : '48%'
            , top : '40%'
          };
        
        return (
            <div className="preloader-wrapper big active" style={LoadingBarCss}>
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        );
    }
}


LoadingBar.propTypes = {
};

LoadingBar.defaultProps = {
};

export default LoadingBar;