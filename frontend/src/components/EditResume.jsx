import React from 'react'
import DashboardLayout from './DashboardLayout'
import { buttonStyles, containerStyles } from '../assets/dummystyle'
import { TitleInput } from './Input'
import { Palette } from 'lucide-react'


const EditResume = () => {
  return (
    <DashboardLayout>
        <div className={containerStyles.main}>
            <div className={containerStyles.header}>
                <TitleInput title={resumeData.title}
                setTitle={(value)=>setResumeData((prev)=>({
                    ...prev,
                    title:value
                }))}
                />

                <div className='flex flex-wrap items-center gap-3'>
                    <button onClick={()=>setOpenThemeSelector(true)} className={buttonStyles.theme}>
                        <Palette size={16} />
                        <span className='text-sm'>Theme</span>
                    </button>
                    <button onC >

                    </button>

                </div>

            </div>

        </div>
    </DashboardLayout>
  )
}

export default EditResume