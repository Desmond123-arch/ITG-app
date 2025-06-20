const Error404Page = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '10vh' }}>
            <h1 style={{ fontSize: '6rem', marginBottom: '1rem' }}>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <a href="/" style={{ color: '#007bff', textDecoration: 'underline' }}>Go to Home</a>
        </div>
    );
}
 
export default Error404Page;