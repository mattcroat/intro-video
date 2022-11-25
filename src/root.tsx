import {
	AbsoluteFill,
	Audio,
	Composition,
	Img,
	interpolate,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'

import './style.css'

export const Intro: React.FC = () => {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()
	const logo = staticFile('logo.png')
	const sonicBrand = staticFile('logo.mp3')
	const whoosh = staticFile('whoosh.mp3')

	const springY = spring({
		frame,
		fps,
		config: { damping: 200 },
		durationInFrames: 10,
	})

	const logoY = interpolate(springY, [0.2, 1], [100, 0], {
		extrapolateRight: 'clamp',
	})

	const textY = interpolate(springY, [0.9, 1], [200, 0], {
		extrapolateRight: 'clamp',
	})

	const circleSize = interpolate(frame, [0, 14], [0, 100], {
		extrapolateRight: 'clamp',
	})

	return (
		<AbsoluteFill className="text-6xl text-white bg-neutral-900 justify-center items-center">
			<div
				className="absolute inset-0 bg-indigo-600"
				style={{
					clipPath: `circle(${circleSize}% at 50% 50%)`,
				}}
			/>
			<Audio src={sonicBrand} volume={0.2} />

			<Sequence from={20}>
				<Audio src={whoosh} volume={0.2} />
			</Sequence>

			<div>
				<div className="flex gap-8 items-center z-10 overflow-hidden">
					<Img
						src={logo}
						className="w-32 drop-shadow-sm"
						style={{ transform: `translateY(${logoY}%)` }}
					/>
					<span
						className="drop-shadow-sm font-bold uppercase"
						style={{ transform: `translateY(${textY}%)` }}
					>
						joy of code
					</span>
				</div>
			</div>
		</AbsoluteFill>
	)
}

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="intro"
				component={Intro}
				durationInFrames={40}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	)
}
