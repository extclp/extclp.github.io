export interface MeteData {
    latest: {
        release: string
        snapshot: string
    }
    versions: MeteDataVersion[]
}

export interface MeteDataVersion {
    id: string
    type: "snapshot" | "release"
    url: string
    time: string
    releaseTime: string
    sha1: string
    complianceLevel: number
}

export interface Version {
    arguments: {
        game: string | {
            rules: {
                action: string
                features: {
                    is_demo_user: boolean
                    has_custom_resolution: boolean
                }
            }[]
            value: string
        }[]
        jvm: string | {
            rules: {
                action: string
                os: {
                    name: string
                    version: string
                    arch: string
                }
            }[]
            value: string[]
        }[]
    }
    assetIndex: {
        id: string
        sha1: string
        size: number
        totalSize: number
        url: string
    }
    assets: string
    complianceLevel: number
    downloads: {
        client: {
            sha1: string
            size: number
            url: string
        }
        client_mappings: {
            sha1: string
            size: number
            url: string
        }
        server: {
            sha1: string
            size: number
            url: string
        }
        server_mappings: {
            sha1: string
            size: number
            url: string
        }
    }
    id: string
    javaVersion: {
        component: string
        majorVersion: number
    }
    libraries: ({
        downloads: {
            artifact: VersionFile
        }
        name: string
        rules?: {
            action: string
            os: {
                name: string
            }
        }[]
    })[]
    logging: {
        client: {
            argument: string
            file: VersionFile
            type: string
        }
    }
    mainClass: string
    minimumLauncherVersion: number
    releaseTime: string
    time: string
    type: string
}

interface VersionFile {
    id: string
    sha1: string
    size: number
    url: string
}

export interface AssetIndex {
    objects: Record<string, {
        hash: string,
        size: number
    }>
}

export interface CustomAssetEntry {
    name: string
    hash: string
    size: number
}

export const downloadSources = [
    {
        name: "Mojang",
        versionManifestV2Url: "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json",
        assetBaseUrl: "https://resources.download.minecraft.net",
    },
    {
        name: "BMCLAPI",
        disabled: true,
        versionManifestV2Url: "https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json",
        assetBaseUrl: "https://bmclapi2.bangbang93.com/assets",
    },
    {
        name: "Mcbbs",
        disabled: true,
        versionManifestV2Url: "https://download.mcbbs.net/mc/game/version_manifest_v2.json",
        assetBaseUrl: "https://download.mcbbs.net/assets",
    }
]