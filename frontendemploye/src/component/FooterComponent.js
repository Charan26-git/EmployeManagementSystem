import React from 'react';

const FooterComponent = () => {
    return (
        <footer className='footer bg-dark text-white mt-auto py-3 text-center'>
            <span>All Rights Reserved &copy; {new Date().getFullYear()}</span>
        </footer>
    )
}

export default FooterComponent;
