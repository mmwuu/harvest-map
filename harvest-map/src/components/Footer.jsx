import React from 'react';

export default function Footer() {
    return (
        <footer className="footer container">
            <div className="footer-columns">
                <div className="footer-column">
                    <h4>Support</h4>
                    <a href="#">Help Centre</a><br/>
                    <a href="#">Safety Information</a><br/>
                    {/* … */}
                </div>
                {/* 其它两列同理 */}
            </div>
            <p>
                &copy; {new Date().getFullYear()} FarmFinder, Inc. &middot;
                <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
            </p>
        </footer>
    );
}
