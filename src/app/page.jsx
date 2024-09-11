"use client";
import { useState, useEffect } from 'react';

export default function Home() {

  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    fetchAnime();
  }, []);

  //กำหนดตัวแปรชื่อ fetchAnime แลตั้งเป็น Async เพื่อให้รอโหลด API ให้เข้ามาก่อน
  const fetchAnime = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime`);
      const data = await response.json();
      if (response.ok) {
        setAnimeData(data.data);
      }
    } catch (error) {
      window.alert('มีข้อผิดพลาดเกี่ยวกับเซิฟเวอร์')
    }
  }

  return (
    <div className="w-[85%] mx-auto">
      <h1 className="text-white text-3xl border-l-4 pl-2 my-4">ANIME-API</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* {animeData?.mal_id} */}
        {animeData.length > 0 ? (
          animeData.map((anime) => (
            <div key={anime.mal_id} className="overflow-hidden rounded-lg shadow-2xl">
              <div className="relative h-[15rem] rounded-t overflow-hidden">
                <img className="w-full h-full object-cover hover:bg-black" src={anime.images.jpg.image_url} alt={`รูปภาพของ ${anime.mal_id}`} />
              </div>
              <div className="p-2  bg-white rounded-b">
                <div className="flex flex-wrap gap-1">
                  {anime.genres.map((genre) => (
                    <p key={genre.mal_id} className="rounded-lg shadow-2xl text-white bg-gradient-to-r from-[#ff66c4] to-[#38b6ff] px-2 mt-2">{genre.name}</p>
                  ))}
                </div>
              </div>

            </div>
          ))
        ) : (
          <div>
            ไม่มีข้อมูลอนิเมะ
          </div>
        )}
      </div>
    </div >
  );
}
