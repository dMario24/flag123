export function getQueyThatfetchFlagById(id: string) {
  return `
      SELECT 
        f.id,
        f.name,
        f.img_url,
        COALESCE(SUM(fl.delta_cnt), 0) AS like_count,
        f.latitude,
        f.longitude,
        COALESCE(fm.source, '🐟') AS source
      FROM 
        flags f
      LEFT JOIN 
        flag_like_history fl
      ON 
        f.id = fl.flag_id
      LEFT JOIN
        flag_metadata fm
      ON 
        f.id = fm.flag_id
      WHERE 
        f.id = ${id}
      GROUP BY 
        f.id, fm.source`;
}
