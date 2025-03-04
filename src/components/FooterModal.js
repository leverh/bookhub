import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from '../styles/FooterModal.module.css'

const currentYear = new Date().getFullYear();
const FooterModal = ({ show, handleClose }) => {
  return (
    <div className={styles.FooterModal}>
    <Modal show={show} onHide={handleClose} centered size="lg" className={styles.modalContent}>
      <Modal.Header closeButton>
        <Modal.Title>More Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBodyContent}>
        <section>
          <h4>About Us</h4>
          <p>Welcome to BookHub, the premier destination for book enthusiasts and readers alike! 
            Our mission is to create a vibrant community where individuals can share, discover, 
            and discuss their favorite books.</p>
          <p>Founded in 2023, BookHub began as a small project aimed at bridging the gap between
             avid readers and the vast world of literature.</p>
        </section>

        <section>
          <h4>Contact</h4>
          <p>Email us at: <a href="BookHub@gmail.com">BookHub@gmail.com</a></p>  
        </section>

        <section>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </section>

        <section>
    <h4>Stay Connected</h4>
    <div className={styles.socialLinks}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook-official" aria-hidden="true"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter-square" aria-hidden="true"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
    </div>
</section>
      </Modal.Body>
      <Modal.Footer>
      <div className={styles.copyright}>
              &copy; {currentYear} Error Codes. All rights reserved.
          </div>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
  
}

export default FooterModal;
