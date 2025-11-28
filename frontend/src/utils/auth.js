export async function getCSRF() {
    const res = await fetch(window.location.origin + "/myapp/csrf", {
        credentials: "include",
    });
    return res.json();
}
