
const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div><footer class="footer mt-auto my-3 py-3 bg-body-tertiary">Copyright &copy; {year} Xurepify</footer></div>
    )
}

export default Footer