import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE;

const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decodedToken.userID).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verifiaction status
        if(!user.isVerified) {
            return res.status(310).json({error: "Email not verified"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected route middleware", error.message);
        res.status(500).json({ error: error.message });
    }
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
