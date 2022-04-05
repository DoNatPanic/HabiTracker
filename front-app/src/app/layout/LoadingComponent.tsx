import { Spinner } from 'react-bootstrap';

export default function loadingComponent() {
    return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" className="align-items-center" />
        </div>
    )
}