export default function Footer() {
    return (

        <div className="main-footer">
            <div className="footer-content">
                <p>Habit tracker service that helps you to build good habits.</p>
                <p>&copy;{new Date().getFullYear()} Habi2be | All rights reserved</p>
                <p>test@test.com</p>
            </div>
            <div className="footer-bottom">
            
                <div className="footer-menu">
                
                    <ul className="f-menu">
                        <li><a href="/">Terms Of Service</a></li>
                        <li><a href="/">Privacy</a></li>
                        <li><a href="/">Cookie settings</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}