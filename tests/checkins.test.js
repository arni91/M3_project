const dotenv = require("dotenv")
dotenv.config()

const { createClient } = require("@supabase/supabase-js")


const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

describe("CRUD checkins", () => {
  let checkinId

  it("Crea un checkin", async () => {
    const { data, error } = await supabase
      .from("checkins")
      .insert({
        user_id: "652d7223-59ad-433b-af54-caf13cea6e43", //el de test@inout.com
        restaurant_id: 1,
        type: "in",
      })
      .select()
      .single()

    if (error) throw error
    checkinId = data.id
    expect(data).toHaveProperty("id")
  })

  it("Lee un checkin", async () => {
    const { data, error } = await supabase
      .from("checkins")
      .select("*")
      .eq("id", checkinId)
      .single()

    if (error) throw error
    expect(data.id).toBe(checkinId)
  })

  it("Actualiza un checkin", async () => {
    const { data, error } = await supabase
      .from("checkins")
      .update({ type: "out" })
      .eq("id", checkinId)
      .select()
      .single()

    if (error) throw error
    expect(data.type).toBe("out")
  })

  it("Borra un checkin", async () => {
    const { error } = await supabase
      .from("checkins")
      .delete()
      .eq("id", checkinId)

    if (error) throw error
    const { data } = await supabase
      .from("checkins")
      .select("*")
      .eq("id", checkinId)

    expect(data).toHaveLength(0)
  })
})
