import { motion } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux'
import { MdBookmark } from 'react-icons/md';


const Projects = () => {

  const projects = useSelector((state) => state.projects?.projects);

  return (
    <div className='w-full py-3 flex items-center justify-center gap-4 flex-wrap'>
      {projects && projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
      
    </div>
  ) 
}

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      key={index}
      className="w-full cursor-pointer md:w-[380px] h-[340px] bg-secondary rounded-md p-3 flex flex-col items-center justify-center gap-2 "
    >
      <div className="bg-pirmary w-full h-full rounded-md overflow-hidden">
        <iframe
          srcDoc={project.output}
          title="Result"
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>

      <div className="flex items-center justify-start gap-2 w-full">
        <div className="w-7 h-7 md:w-12 md:h-10 flex items-center justify-center overflow-hidden rounded-lg cursor-pointer bg-sky-600">
          {project?.user?.photoURL ? (
            <>
              <moiton.img
                whleHover={{ scale: 1.2 }}
                src={project?.user?.photoURL}
                alt={project?.user?.displayName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </>
          ) : (
            <>
              <p className="text-lg text-textm font-semibold capitalize">
                {project?.user?.email[0]}
              </p>
            </>
          )}
        </div>
        <div>
          <p className="text-textm text-sm">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project?.user?.email.split("@")[0]}`}
          </p>
        </div>


        <motion.div whileTap={{scale:0.9}} className="cursor-pointer ml-auto">
          <MdBookmark className="text-textm text-lg"/>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Projects