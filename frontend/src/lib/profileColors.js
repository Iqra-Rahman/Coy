const profileColors = [
    "var(--coy-lavender)",
    "var(--coy-mint)",
    "var(--coy-soft-pink)",
    "var(--coy-blue)",
];

export function getProfileColor(profileId) {
    return profileColors[profileId % profileColors.length];
}
