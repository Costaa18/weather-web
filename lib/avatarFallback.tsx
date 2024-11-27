const avatarFallback = (name: string) => {
    const initials = name.split(' ').map((n) => n[0]).join('');
    return initials.toUpperCase();
};

export default avatarFallback;