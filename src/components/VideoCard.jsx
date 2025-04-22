"use client";

import Link from "next/link";

export default function VideoCard({ video, compact = false }) {
    return (
        <Link
            href={`/video/${video.id}`}
            className="text-decoration-none text-white"
        >
            <div
                className="card bg-dark text-white border-0 h-100"
                style={{
                    minWidth: compact ? "200px" : undefined,
                    maxWidth: compact ? "200px" : undefined,
                    flex: compact ? "0 0 auto" : undefined,
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                }}
            >
                <img
                    src={video.capa_video || video.thumb_url}
                    className="card-img-top"
                    alt={video.titulo}
                    style={{ objectFit: "cover", height: compact ? "280px" : "200px" }}
                />
                <div className="card-body px-2 py-3">
                    <h6 className="card-title text-truncate">{video.titulo}</h6>
                    {!compact && (
                        <p className="card-text small">{video.descricao?.slice(0, 80)}...</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
