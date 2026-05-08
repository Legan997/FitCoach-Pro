// ── FITCOACH PRO — TEST SCRIPT ─────────────────────────────────────────────
// Pega este script en la consola del navegador (F12 → Console)
// Carga 2 usuarios con historial de 3 sesiones cada uno

(function() {
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

  const baseExs = {
    bench_press:  { w: 60,  sets: 4, reps: 10 },
    incline_press:{ w: 40,  sets: 3, reps: 12 },
    dumbbell_fly: { w: 14,  sets: 3, reps: 15 },
    pushup:       { w: 0,   sets: 3, reps: 20 },
    deadlift:     { w: 100, sets: 4, reps: 6  },
    pullup:       { w: 0,   sets: 3, reps: 8  },
    lat_pull:     { w: 55,  sets: 3, reps: 12 },
    bent_row:     { w: 70,  sets: 4, reps: 8  },
    cable_row:    { w: 50,  sets: 3, reps: 12 },
    squat:        { w: 90,  sets: 4, reps: 8  },
    leg_press:    { w: 140, sets: 3, reps: 12 },
    lunge:        { w: 20,  sets: 3, reps: 12 },
    leg_ext:      { w: 50,  sets: 3, reps: 15 },
    leg_curl:     { w: 40,  sets: 3, reps: 15 },
    calf:         { w: 60,  sets: 4, reps: 20 },
    mil_press:    { w: 45,  sets: 3, reps: 10 },
    lat_raise:    { w: 10,  sets: 3, reps: 15 },
    front_raise:  { w: 8,   sets: 3, reps: 15 },
    rev_fly:      { w: 8,   sets: 3, reps: 15 },
    bar_curl:     { w: 35,  sets: 3, reps: 12 },
    db_curl:      { w: 14,  sets: 3, reps: 12 },
    hammer:       { w: 14,  sets: 3, reps: 12 },
    pushdown:     { w: 30,  sets: 3, reps: 15 },
    skull:        { w: 25,  sets: 3, reps: 12 },
    oh_ext:       { w: 20,  sets: 3, reps: 12 },
    plank:        { w: 0,   sets: 3, reps: 60 },
    crunch:       { w: 0,   sets: 3, reps: 20 },
    leg_raise:    { w: 0,   sets: 3, reps: 15 },
    russian:      { w: 10,  sets: 3, reps: 20 },
  };

  // Progresión: aumenta pesos un % por sesión
  function progEx(base, pct) {
    const r = {};
    for (const [k, v] of Object.entries(base)) {
      r[k] = { w: +(v.w * (1 + pct)).toFixed(1), sets: v.sets, reps: v.reps };
    }
    return r;
  }

  function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString();
  }

  // ── USUARIO 1: Carlos — Pérdida de peso ──────────────────────────────────
  const carlos = {
    id: uid(),
    name: 'Carlos Mendoza',
    age: 30,
    gender: 'male',
    height: 178,
    level: 'intermediate',
    goal: 'weight_loss',
    targetW: 80,
    sessions: [
      { date: daysAgo(60), weight: 95, goal: 'weight_loss', exs: baseExs },
      { date: daysAgo(30), weight: 90, goal: 'weight_loss', exs: progEx(baseExs, 0.05) },
      { date: daysAgo(5),  weight: 86, goal: 'weight_loss', exs: progEx(baseExs, 0.10) },
    ]
  };

  // ── USUARIO 2: Laura — Ganancia muscular ─────────────────────────────────
  const laura = {
    id: uid(),
    name: 'Laura Gómez',
    age: 25,
    gender: 'female',
    height: 165,
    level: 'beginner',
    goal: 'muscle_gain',
    targetW: 60,
    sessions: [
      { date: daysAgo(45), weight: 54, goal: 'muscle_gain', exs: { ...baseExs, bench_press:{w:20,sets:3,reps:10}, squat:{w:30,sets:3,reps:12}, deadlift:{w:40,sets:3,reps:8} } },
      { date: daysAgo(20), weight: 56, goal: 'muscle_gain', exs: { ...baseExs, bench_press:{w:25,sets:3,reps:10}, squat:{w:40,sets:3,reps:12}, deadlift:{w:50,sets:3,reps:8} } },
      { date: daysAgo(3),  weight: 57.5, goal: 'muscle_gain', exs: { ...baseExs, bench_press:{w:30,sets:4,reps:10}, squat:{w:50,sets:4,reps:10}, deadlift:{w:60,sets:3,reps:8} } },
    ]
  };

  // ── GUARDAR EN LOCALSTORAGE ───────────────────────────────────────────────
  const existing = JSON.parse(localStorage.getItem('fitcoach_db') || '{"users":{}}');
  existing.users[carlos.id] = carlos;
  existing.users[laura.id]  = laura;
  localStorage.setItem('fitcoach_db', JSON.stringify(existing));

  console.log('%c✅ FitCoach Test Data Loaded', 'color:#00d4aa;font-size:14px;font-weight:bold');
  console.log('Usuarios cargados:');
  console.log(`  👤 ${carlos.name} — Perder peso (95kg → 86kg, meta: 80kg)`);
  console.log(`  👤 ${laura.name} — Ganar músculo (54kg → 57.5kg, meta: 60kg)`);
  console.log('%cRecarga la página (F5) y haz clic en "Ya entreno aquí"', 'color:#ffd93d;font-size:12px');

  // Auto-reload
  setTimeout(() => location.reload(), 800);
})();
