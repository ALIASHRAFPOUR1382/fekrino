import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header className="header" initial={{y:-35,opacity:0}} animate={{y:0,opacity:1}}
      transition={{duration:.6,ease:[.22,1,.36,1]}}>
      <div className="brand-mark">ف</div>
      <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.12}}>
        مؤسسه فکرینو
      </motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.25}}>
        آموزش هوش، استعداد تحلیلی و خلاقیت
      </motion.p>
      <motion.span className="header-badge" initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{delay:.4}}>
        ✦ با مدیریت مهندس علی اشرفپور
      </motion.span>
    </motion.header>
  )
}
